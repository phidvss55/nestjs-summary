openssl req -x509 -newkey rsa:4096 -sha256 -days 3650 \
 -nodes -keyout ./nginx/certs/key.key -out ./nginx/certs/key.crt -subj "/CN=localhost"

  <!-- \ -->
  <!-- -addext "subjectAltName=DNS:example.com,DNS:*.example.com,IP:10.0.0.1" -->
