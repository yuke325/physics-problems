# 2025年11月ハッカソン

## GitHub運用ルール
- main ←いきなりマージはなし
  - 本番環境
- develop ←いきなりマージはなし
  - 開発環境
- features
  - 各機能ごとに追加していくブランチ 
  - feature/todo-add
  - feature/todo-list

自分のローカルでブランチをきるときには、
mainから切って、後でマージするときにRebase,Mergeする
もう一人の最新ブランチから切って、後でマージするときにRebase,Mergeする

## リンターとフォーマッター
共通のものを使いましょう
Biomeが好きです。。。

lefthook,pre-commit興味があればいれるのはありかも？

## テスト
これはなしです。。。
