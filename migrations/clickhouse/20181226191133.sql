RENAME TABLE events TO events_bk;

CREATE TABLE IF NOT EXISTS events (
  Target String,

  RequestMethod Nullable(Enum8(
    'GET' = 0,
    'POST' = 1,
    'PUT' = 2,
    'PATCH' = 3,
    'DELETE' = 4,
    'COPY' = 5,
    'HEAD' = 6,
    'OPTIONS' = 7,
    'LINK' = 8,
    'UNLINK' = 9,
    'PURGE' = 10,
    'LOCK' = 11,
    'UNLOCK' = 12,
    'PROPFIND' = 13,
    'VIEW' = 14
  )),
  RequestLanguage Nullable(String),
  RequestSecure UInt8 DEFAULT 0,
  RequestAjax UInt8 DEFAULT 0,
  RequestRoute Nullable(String),
  RequestDomain Nullable(String),
  RequestUrl Nullable(String),
  RequestIp FixedString(16),
  RequestBot Int8 DEFAULT 0,
  RequestUserAgent Nullable(String),

  RecipientRequest_seconds Int64,
  RecipientRequest_nanoseconds Int32,
  RecipientOsHostname String,
  RecipientHostname String,
  RecipientIp FixedString(16),
  RecipientPort Int16,
  RecipientPlatform String,
  RecipientArch Enum8(
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
  RecipientUptime Float32,
  RecipientUid Int16,
  RecipientGid Int16,
  RecipientPpid Int16,
  RecipientPid Int16,

  ConsumerRequest_seconds Int64,
  ConsumerRequest_nanoseconds Int32,
  ConsumerOsHostname String,
  ConsumerIp FixedString(16),
  ConsumerPlatform String,
  ConsumerArch Enum8(
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
  ConsumerUptime Float32,
  ConsumerUid Int16,
  ConsumerGid Int16,
  ConsumerPpid Int16,
  ConsumerPid Int16,

  EventDevice Enum8(
    'server' = 0,
    'browser' = 1,
    'ios' = 2,
    'android' = 3
  ),
  EventCategory String,
  EventAction String,
  EventLabel Nullable(String),
  EventValue Nullable(Int32),
  EventJson Nullable(String),

  PageLoadTime Int16 DEFAULT 0,
  SessionId Nullable(String),
  
  PlatformName Nullable(String),
  PlatformVersion Nullable(String),
  PlatformProduct Nullable(String),
  PlatformManufacturer Nullable(String),
  PlatformLayout Nullable(String),
  PlatformOsArch Nullable(Int8),
  PlatformOsFamily Nullable(String),
  PlatformOsVersion Nullable(String),

  VisitorUserId Nullable(Int32),
  VisitorUuid Nullable(FixedString(16)),
  VisitorBrowserWidth Nullable(Int16),
  VisitorBrowserHeight Nullable(Int16),
  VisitorDeviceWidth Nullable(Int16),
  VisitorDeviceHeight Nullable(Int16),
  VisitorDevice Nullable(Enum8(
    'desktop' = 0,
    'mobile' = 1,
    'tablet' = 2
  )),
  VisitorDeviceOrientation Nullable(Enum8(
    'landscape' = 0,
    'portrait' = 1
  )),

  GoogleClientId Nullable(String),
  Gclid Nullable(String),

  YmClientId Nullable(String),
  Ymclid Nullable(String),
  Yclid Nullable(String),

  ReferrerKnown Int8 DEFAULT 0,
  ReferrerName Nullable(String),
  ReferrerMedium Nullable(Enum8(
    'direct' = 0,
    'advert' = 1,
    'email' = 2,
    'social' = 3,
    'internal' = 4,
    'search' = 5
  )),
  ReferrerSearchParameter Nullable(String),
  ReferrerSearchTerm Nullable(String),
  ReferrerUri Nullable(String),

  UtmSource Nullable(String),
  UtmMedium Nullable(String),
  UtmTerm Nullable(String),
  UtmContent Nullable(String),
  UtmCampaign Nullable(String),

  CreatedDate Date,
  CreatedTime DateTime
) ENGINE = MergeTree(CreatedDate, RequestIp, 8192);

INSERT INTO events SELECT * FROM events_bk;
DROP TABLE IF EXISTS events_bk;

ALTER TABLE events
  MODIFY COLUMN VisitorUserId Nullable(String);
