# Internet Access Bastion Host
resource "aws_internet_gateway" "main" {
  count  = var.enable_bastion ? 1 : 0
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "main-igw"
  }
}

resource "aws_route_table" "public" {
  count  = var.enable_bastion ? 1 : 0
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main[0].id
  }

  tags = {
    Name = "public-route-table"
  }
}

resource "aws_route_table_association" "subnet_a_association" {
  count  = var.enable_bastion ? 1 : 0
  subnet_id      = aws_subnet.subnet_a.id
  route_table_id = aws_route_table.public[0].id
}

# Bastion Host configuration
resource "aws_key_pair" "bastion_key" {
  count  = var.enable_bastion ? 1 : 0
  key_name   = "cph-bastion-key"
  public_key = file("~/.ssh/cph-bastion-key.pub")
}

resource "aws_security_group" "bastion" {
  count  = var.enable_bastion ? 1 : 0
  name        = "bastion-sg"
  description = "Allow SSH from my IP"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

data "aws_ami" "amazon_linux" {
  count  = var.enable_bastion ? 1 : 0
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["amzn2-ami-hvm-*-x86_64-gp2"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

resource "aws_instance" "bastion" {
  count  = var.enable_bastion ? 1 : 0
  ami                         = data.aws_ami.amazon_linux[0].id
  instance_type               = "t3.micro"
  subnet_id                   = aws_subnet.subnet_a.id
  associate_public_ip_address = true
  key_name                    = aws_key_pair.bastion_key[0].key_name
  vpc_security_group_ids      = [aws_security_group.bastion[0].id]
  tags = {
    Name = "cph-bastion"
  }
}
