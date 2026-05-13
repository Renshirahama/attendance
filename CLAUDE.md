# 勤怠管理アプリ設計

## 目的

このアプリは、社員・インターン・アルバイトなどのメンバーが、出勤・退勤・シフト申請・日報提出を簡単に行えるようにする勤怠管理システムです。

現在、

- 出勤管理がLINEや口頭
- シフト管理がバラバラ
- 日報提出状況が見えない
- 誰が働いているか分かりづらい
- 修正履歴が残らない

などの問題があります。

このアプリでは、
打刻・シフト申請・カレンダー・日報・ダッシュボードを一体化し、管理しやすい環境を作ります。

---

# 5画面

## 1. 打刻画面
- 出勤
- 退勤
- 休憩開始
- 休憩終了
- 今日の勤務時間表示

## 2. シフト申請画面
- 日付
- 開始時間
- 終了時間
- メモ
- ステータス表示

status:
- pending
- approved
- rejected

## 3. カレンダー画面
- 勤務予定
- 出勤履歴
- 承認済みシフト
- 申請中シフト

をカレンダー形式で表示。

## 4. 日報画面
- 今日やったこと
- 学んだこと
- 困っていること
- 明日やること
- 管理者コメント

## 5. ダッシュボード画面
管理者用画面。

表示内容:
- 今日の出勤者
- 勤務中メンバー
- 未提出日報
- 承認待ちシフト
- 月別勤務時間

---

# 5テーブル

## profiles
ユーザー情報管理。

主なカラム:
- id
- name
- email
- role

role:
- admin
- member

## attendances
勤怠情報管理。

主なカラム:
- user_id
- work_date
- clock_in_at
- clock_out_at
- total_work_minutes
- status

## shifts
シフト申請管理。

主なカラム:
- user_id
- shift_date
- start_time
- end_time
- note
- status
- approved_by

## daily_reports
日報管理。

主なカラム:
- user_id
- report_date
- done_text
- learned_text
- issue_text
- next_action_text

## action_logs
重要操作履歴を保存。

主なカラム:
- user_id
- action_type
- target_table
- target_id
- before_data
- after_data
- created_at

記録対象:
- 出勤
- 退勤
- シフト申請
- 承認
- 却下
- 日報提出
- 管理者修正

---

# 承認フロー

1. member がシフト申請
2. status が pending
3. admin が確認
4. approved または rejected に変更
5. action_logs に保存

ルール:
- admin のみ承認・却下可能
- 却下理由を保存
- 承認履歴を保持

---

# 役割

## admin
できること:
- 全勤怠閲覧
- シフト承認・却下
- 日報確認
- 勤怠修正
- ダッシュボード閲覧
- action_logs確認

## member
できること:
- 出勤・退勤
- シフト申請
- カレンダー確認
- 日報提出
- 自分の勤怠確認

できないこと:
- 他人の勤怠閲覧
- シフト承認
- action_logs閲覧

---

# システムルール

- サーバー時刻で打刻
- 重要操作は action_logs に保存
- RLS前提
- member は自分のデータのみ閲覧
- admin は全データ閲覧可能
- 日本語UI
- モバイルファースト
- シンプルで清潔感あるSaaSデザイン
