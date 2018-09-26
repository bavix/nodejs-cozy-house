CREATE TABLE events (
  target String,

  request_method Nullable(Enum8(
    'GET' = 0,
    'POST' = 1,
    'PUT' = 2,
    'PATCH' = 3,
    'DELETE' = 4,
    'HEAD' = 5,
    'OPTIONS' = 6
  )),
  request_language Nullable(String),
  request_secure UInt8 DEFAULT 0,
  request_ajax UInt8 DEFAULT 0,
  request_route Nullable(String),
  request_domain Nullable(String),
  request_url Nullable(String),
  request_ip FixedString(16),
  request_bot Int8 DEFAULT 0,
  request_user_agent Nullable(String),

  recipient_request_seconds Int64,
  recipient_request_nanoseconds Int32,
  recipient_os_hostname String,
  recipient_hostname String,
  recipient_ip FixedString(16),
  recipient_port Int16,
  recipient_platform String,
  recipient_arch Enum8(
    'arm' = 0,
    'arm64' = 1,
    'ia32' = 2,
    'mips' = 3,
    'mipsel' = 4,
    'ppc' = 5,
    'ppc64' = 6,
    's390' = 7,
    's390x' = 8,
    'x32' = 9,
    'x64' = 10
  ),
  recipient_uptime Float32,
  recipient_uid Int16,
  recipient_gid Int16,
  recipient_ppid Int16,
  recipient_pid Int16,

  consumer_request_seconds Int64,
  consumer_request_nanoseconds Int32,
  consumer_os_hostname String,
  consumer_hostname String,
  consumer_ip FixedString(16),
  consumer_port Int16,
  consumer_platform String,
  consumer_arch Enum8(
    'arm' = 0,
    'arm64' = 1,
    'ia32' = 2,
    'mips' = 3,
    'mipsel' = 4,
    'ppc' = 5,
    'ppc64' = 6,
    's390' = 7,
    's390x' = 8,
    'x32' = 9,
    'x64' = 10
  ),
  consumer_uptime Float32,
  consumer_uid Int16,
  consumer_gid Int16,
  consumer_ppid Int16,
  consumer_pid Int16,

  event_device Enum8(
    'server' = 0,
    'browser' = 1,
    'ios' = 2,
    'android' = 3
  ),
  event_category String,
  event_action String,
  event_label Nullable(String),
  event_value Nullable(Int32),
  event_json Nullable(String),

  page_load_time Int16 DEFAULT 0,
  session_id Nullable(String),
  
  platform_name Nullable(String),
  platform_version Nullable(String),
  platform_product Nullable(String),
  platform_manufacturer Nullable(String),
  platform_layout Nullable(String),
  platform_os_arch Nullable(String),
  platform_os_family Nullable(String),
  platform_os_version Nullable(String),

  visitor_webp Int8 DEFAULT 0,
  visitor_user_id Nullable(Int32),
  visitor_uuid Nullable(FixedString(16)),
  visitor_browser_width Nullable(Int16),
  visitor_browser_height Nullable(Int16),
  visitor_device_width Nullable(Int16),
  visitor_device_height Nullable(Int16),
  visitor_device Nullable(Enum8(
    'desktop' = 0,
    'mobile' = 1,
    'tablet' = 2
  )),
  visitor_device_orientation Nullable(Enum8(
    'landscape' = 0,
    'portrait' = 1
  )),

  google_client_id Nullable(String),
  gclid Nullable(String),

  ym_client_id Nullable(String),
  ymclid Nullable(String),
  yclid Nullable(String),

  referrer_known Int8 DEFAULT 0,
  referrer_name Nullable(String),
  referrer_medium Nullable(Enum8(
    'direct' = 0,
    'advert' = 1,
    'email' = 2,
    'social' = 3,
    'internal' = 4,
    'search' = 5
  )),
  referrer_search_parameter Nullable(String),
  referrer_search_term Nullable(String),
  referrer_uri Nullable(String),

  utm_source Nullable(String),
  utm_medium Nullable(String),
  utm_term Nullable(String),
  utm_content Nullable(String),
  utm_campaign Nullable(String),

  created_date Date,
  created_time DateTime
) ENGINE = MergeTree(created_date, request_ip, 8192)
