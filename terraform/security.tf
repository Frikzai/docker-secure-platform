resource "oci_core_security_list" "public" {
  compartment_id = var.compartment_ocid
  vcn_id         = oci_core_vcn.main.id

  display_name = "${var.project_name}-${var.environment}-public-sl"

  egress_security_rules {
    protocol    = "all"
    destination = "0.0.0.0/0"
  }

  ingress_security_rules {
    protocol = "6"
    source   = var.admin_public_ip_cidr

    tcp_options {
      min = 22
      max = 22
    }

    description = "SSH from admin public IP"
  }

  ingress_security_rules {
    protocol = "6"
    source   = "0.0.0.0/0"

    tcp_options {
      min = 80
      max = 80
    }

    description = "HTTP public access"
  }

  ingress_security_rules {
    protocol = "6"
    source   = "0.0.0.0/0"

    tcp_options {
      min = 443
      max = 443
    }

    description = "HTTPS public access"
  }

  ingress_security_rules {
    protocol = "6"
    source   = var.admin_public_ip_cidr

    tcp_options {
      min = 81
      max = 81
    }

    description = "Nginx Proxy Manager admin panel from admin IP"
  }

  freeform_tags = local.common_tags
}
