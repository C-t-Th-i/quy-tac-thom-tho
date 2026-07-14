#requires -version 5.0
# Hook PreToolUse: canh bao mem khi Claude dinh TAO MOI mot SKILL.md.
# Khong chan cung - chi nhac quy trinh qua systemMessage. Claude tu doc va quyet dinh.
# Trigger: tool=Write, path khop **/.claude/skills/<X>/SKILL.md va file CHUA ton tai.

$ErrorActionPreference = 'Stop'

try {
    $raw = [Console]::In.ReadToEnd()
    if ([string]::IsNullOrWhiteSpace($raw)) { exit 0 }
    $data = $raw | ConvertFrom-Json
} catch {
    # Loi parse - khong chan, log de debug
    [Console]::Error.WriteLine("hook-parse-error: $_")
    exit 0
}

$tool = $data.tool_name
if ($tool -ne 'Write') { exit 0 }

$path = $data.tool_input.file_path
if ([string]::IsNullOrWhiteSpace($path)) { exit 0 }

# Khop pattern: chua .claude/skills/<X>/SKILL.md (Windows backslash hoac forward slash)
if ($path -notmatch '\.claude[\\/]skills[\\/][^\\/]+[\\/]SKILL\.md$') { exit 0 }

# File da ton tai = update, khong canh bao
if (Test-Path -LiteralPath $path) { exit 0 }

$msg = @'
CANH BAO MEM - dang TAO MOI mot skill.

Truoc khi Write SKILL.md, tu kiem 3 dieu (skill hoi-roi-lam):
  1. Da tim trong du an/cong cu co san xem co giai phap nao lam duoc viec nay chua?
  2. Neu chua co - da can nhac tim giai phap ben ngoai (repo/cong cu cong dong) truoc khi tu viet moi?
  3. Da GRILL ro y tuong + trinh "ban de hieu" trai nghiem TREN CHAT
     (nguoi dung go gi -> em hoi gi -> man hinh thay gi -> file ra dau -> pham vi khong lam)
     va nguoi dung DA NHAN "chot"?

Thieu dieu nao -> DUNG ngay, lam dieu do truoc, cho nguoi dung chot.
Du ca 3 -> ghi 1 dong vao SKILL.md giai thich "khong giai phap nao co san phu hop vi ...".

Day la canh bao mem - tool van chay binh thuong. Tu kiem lan cuoi.
'@

$out = @{
    continue = $true
    systemMessage = $msg
} | ConvertTo-Json -Compress

Write-Output $out
exit 0
