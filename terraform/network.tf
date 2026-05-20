locals {
  common_tags = {
    project     = var.project_name
    environment = var.environment
    managed_by  = "terraform"
  }
}

resource "oci_core_vcn" "main" {
  compartment_id = var.compartment_ocid

  cidr_blocks  = [var.vcn_cidr]
  display_name = "${var.project_name}-${var.environment}-vcn"
  dns_label    = "dockerlab"

  freeform_tags = local.common_tags
}

resource "oci_core_internet_gateway" "main" {
  compartment_id = var.compartment_ocid
  vcn_id         = oci_core_vcn.main.id

  display_name = "${var.project_name}-${var.environment}-igw"
  enabled      = true

  freeform_tags = local.common_tags
}

resource "oci_core_route_table" "public" {
  compartment_id = var.compartment_ocid
  vcn_id         = oci_core_vcn.main.id

  display_name = "${var.project_name}-${var.environment}-public-rt"

  route_rules {
    destination       = "0.0.0.0/0"
    destination_type  = "CIDR_BLOCK"
    network_entity_id = oci_core_internet_gateway.main.id
  }

  freeform_tags = local.common_tags
}

resource "oci_core_subnet" "public" {
  compartment_id = var.compartment_ocid
  vcn_id         = oci_core_vcn.main.id

  cidr_block                 = var.public_subnet_cidr
  display_name               = "${var.project_name}-${var.environment}-public-subnet"
  dns_label                  = "public"
  route_table_id             = oci_core_route_table.public.id
  security_list_ids          = [oci_core_security_list.public.id]
  prohibit_public_ip_on_vnic = false

  freeform_tags = merge(local.common_tags, {
    tier = "public"
  })
}
