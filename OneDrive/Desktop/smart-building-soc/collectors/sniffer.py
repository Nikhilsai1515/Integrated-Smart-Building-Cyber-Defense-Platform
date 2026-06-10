from scapy.all import sniff, IP
import requests

API = "http://localhost:8000/traffic"

def process_packet(packet):

    if IP in packet:

        data = {
            "src_ip": packet[IP].src,
            "dst_ip": packet[IP].dst,
            "size": len(packet)
        }

        requests.post(API, json=data)

sniff(prn=process_packet, store=False)