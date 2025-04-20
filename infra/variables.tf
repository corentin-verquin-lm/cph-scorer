data "aws_caller_identity" "current" {}
data "aws_ssm_parameter" "db_user" {
  name = "/cph/prod/db_user"

}
data "aws_ssm_parameter" "db_password" {
  name = "/cph/prod/db_password"
  with_decryption = true
}
data "aws_ssm_parameter" "db_name" {
  name = "/cph/prod/db_name"
}

variable "enable_bastion" {
  description = "Toggle to enable/disable the Bastion Host"
  type        = bool
  default     = false
}