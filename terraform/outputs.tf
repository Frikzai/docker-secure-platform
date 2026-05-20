output "instance_public_ip" {
  description = "Docker host public IP"
  value       = oci_core_instance.docker_host.public_ip
}

output "ssh_command" {
  description = "SSH command"
  value       = "ssh -i ~/.ssh/docker_platform ubuntu@${oci_core_instance.docker_host.public_ip}"
}

output "vcn_id" {
  description = "VCN OCID"
  value       = oci_core_vcn.main.id
}

output "public_subnet_id" {
  description = "Public subnet OCID"
  value       = oci_core_subnet.public.id
}
