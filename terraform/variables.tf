variable "tenancy_ocid" {
  description = "OCI tenancy OCID"
  type        = string
  sensitive   = true
}

variable "user_ocid" {
  description = "OCI user OCID"
  type        = string
  sensitive   = true
}

variable "fingerprint" {
  description = "OCI API key fingerprint"
  type        = string
  sensitive   = true
}

variable "private_key_path" {
  description = "Path to OCI API private key"
  type        = string
  sensitive   = true
}

variable "region" {
  description = "OCI region"
  type        = string
}

variable "compartment_ocid" {
  description = "OCI compartment OCID"
  type        = string
}

variable "project_name" {
  description = "Project name"
  type        = string
  default     = "docker-secure-platform"
}

variable "environment" {
  description = "Environment"
  type        = string
  default     = "dev"
}

variable "admin_public_ip_cidr" {
  description = "Admin public IP allowed for SSH and admin panels"
  type        = string
}

variable "ssh_public_key_path" {
  description = "Path to SSH public key"
  type        = string
}

variable "vcn_cidr" {
  description = "VCN CIDR"
  type        = string
  default     = "10.10.0.0/16"
}

variable "public_subnet_cidr" {
  description = "Public subnet CIDR"
  type        = string
  default     = "10.10.1.0/24"
}

variable "instance_shape" {
  description = "OCI instance shape"
  type        = string
  default     = "VM.Standard.E2.1.Micro"
}
