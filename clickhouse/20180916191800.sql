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
  request_language String DEFAULT '',
  request_secure UInt8 DEFAULT 0,
  request_post UInt8 DEFAULT 0,
  request_ajax UInt8 DEFAULT 0,
  request_route String DEFAULT '',
  request_domain String DEFAULT '',
  request_url String DEFAULT '',
  request_ip FixedString(16),
  request_user_agent String DEFAULT '',
  request_duration Int32 DEFAULT 0,

  backend_name String,
  backend_pid Int16,
  backend_ip FixedString(16),
  backend_port Int16,
  backend_host_name String,

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

  google_client_id String DEFAULT '',
  gclid String DEFAULT '',

  ym_client_id String DEFAULT '',
  ymclid String DEFAULT '',
  yclid String DEFAULT '',

  ef_id String DEFAULT '',

  referrer_channel Nullable(Enum8(
    'direct' = 0,
    'advert' = 1,
    'email' = 2,
    'social' = 3,
    'internal' = 4,
    'search' = 5
  )),
  referrer_domain String DEFAULT '',
  referrer String DEFAULT '',

  utm_source String DEFAULT '',
  utm_medium String DEFAULT '',
  utm_term String DEFAULT '',
  utm_content String DEFAULT '',
  utm_campaign String DEFAULT '',

  created_date Date,
  created_time DateTime
) ENGINE = MergeTree(created_date, request_ip, 8192)
