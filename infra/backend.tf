terraform {
  backend "s3" {
    bucket         = "cph-terraform-state-bucket"
    key            = "terraform.tfstate"
    region         = "eu-west-3"
  }
}