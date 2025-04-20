output "lambda_security_group_id" {
  value = aws_security_group.lambda.id
}

output "subnet_a_id" {
  value = aws_subnet.subnet_a.id
}

output "subnet_b_id" {
  value = aws_subnet.subnet_b.id
}

resource "aws_ssm_parameter" "postgres_connection_string" {
  name  = "/cph/prod/postgres_connection_string"
  type  = "SecureString"
  value = "postgresql://${data.aws_ssm_parameter.db_user.value}:${data.aws_ssm_parameter.db_password.value}@${aws_rds_cluster.postgres.endpoint}:${aws_rds_cluster.postgres.port}/${data.aws_ssm_parameter.db_name.value}"
}

output "bastion_public_ip" {
  value       = var.enable_bastion ? aws_instance.bastion[0].public_ip : null
  sensitive = true
}
