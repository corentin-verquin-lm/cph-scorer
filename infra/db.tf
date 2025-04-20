# Aurora PostgreSQL Serverless v2 Cluster
resource "aws_rds_cluster" "postgres" {
  cluster_identifier     = "cph-aurora-cluster"
  engine                 = "aurora-postgresql"
  database_name          = data.aws_ssm_parameter.db_name.value
  master_username        = data.aws_ssm_parameter.db_user.value
  master_password        = data.aws_ssm_parameter.db_password.value
  db_subnet_group_name   = aws_db_subnet_group.main.name
  vpc_security_group_ids = [aws_security_group.rds.id]
  skip_final_snapshot    = true
  deletion_protection    = false
  storage_encrypted      = true

  backup_retention_period = 1
  copy_tags_to_snapshot   = true
  apply_immediately       = true

  serverlessv2_scaling_configuration {
    min_capacity = 0
    max_capacity = 1
  }
}

# Aurora Cluster Instance (Serverless v2)
resource "aws_rds_cluster_instance" "postgres_instance" {
  identifier           = "cph-aurora-instance"
  cluster_identifier   = aws_rds_cluster.postgres.id
  instance_class       = "db.serverless"
  engine               = aws_rds_cluster.postgres.engine
  engine_version       = aws_rds_cluster.postgres.engine_version
  publicly_accessible  = false
  db_subnet_group_name = aws_db_subnet_group.main.name
}
