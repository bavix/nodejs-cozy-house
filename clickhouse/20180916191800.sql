CREATE TABLE events (
  request_method Nullable(Enum8(
    'get' = 0,
    'post' = 1,
    'put' = 2,
    'patch' = 3,
    'delete' = 4,
    'head' = 5,
    'options' = 6
  )),
  request_bot Int8 DEFAULT 0,
  request_language Nullable(String),
  request_secure UInt8 DEFAULT 0,
  request_ajax UInt8 DEFAULT 0,
  request_route Nullable(String),
  request_domain Nullable(String),
  request_url Nullable(String),
  request_ip FixedString(16),
  request_user_agent Nullable(String),
  request_duration Int32 DEFAULT 0,
  request_sid Nullable(String),

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

  event_type Enum8(
    'backend' = 0,
    'frontend' = 1,
    'ios' = 2,
    'android' = 3
  ),
  event_name Nullable(Enum8(
    'request' = 0,
    'modal' = 1,
    'click' = 2,
    'close' = 3,
    'load' = 4,
    'progress' = 5,
    'create' = 6,
    'read' = 7,
    'update' = 8,
    'delete' = 9,
    'success' = 10,
    'error' = 11,
    'pageview' = 12,
    'identify' = 13,
    'upload' = 14,
    'download' = 15,
    'alert' = 16
  )),
  event_segment String,
  event_segment_json String,

  page_load_time Int16 DEFAULT 0,

  visitor_webp Int8 DEFAULT 0,
  visitor_user_id Int32 DEFAULT 0,
  visitor_uuid Nullable(FixedString(16)),
  visitor_browser_width Int16 DEFAULT 0,
  visitor_browser_height Int16 DEFAULT 0,
  visitor_device_width Int16 DEFAULT 0,
  visitor_device_height Int16 DEFAULT 0,
  visitor_device Nullable(Enum8(
    'desktop' = 0,
    'mobile' = 1,
    'tablet' = 2
  )),

  visitor_device_os Nullable(Enum8(
    'windows' = 0,
    'macos' = 1,
    'linux' = 2
  )),

  google_client_id Nullable(String),
  gclid Nullable(String),

  ym_client_id Nullable(String),
  ymclid Nullable(String),
  yclid Nullable(String),

  ef_id Nullable(String),

  referrer_channel Nullable(Enum8(
    'direct' = 0,
    'advert' = 1,
    'email' = 2,
    'social' = 3,
    'internal' = 4,
    'search' = 5
  )),
  referrer_domain Nullable(String),
  referrer Nullable(String),

  utm_source Nullable(String),
  utm_medium Nullable(String),
  utm_term Nullable(String),
  utm_content Nullable(String),
  utm_campaign Nullable(String),

  created_date Date,
  created_time DateTime
) ENGINE = MergeTree(created_date, request_ip, 8192)
