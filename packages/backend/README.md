# notification-app-backend

## 概要

SSEによる通知機能を実装するためのバックエンドリポジトリです。  
clean architecture を念頭に実装しています。
BackendはExpress.jsを基盤に実装しています。(https://expressjs.com/)

## ディレクトリ構成

### /app

ビジネスロジックを配置します。

- /app/patient
- /app/hospital

のようにアクターごとにディレクトリを作成しています。

### /cmd

アプリケーションのエントリーポイントを配置します。

### /domain

ドメイン層のコードを配置します。

-/domain/entity
-/domain/value-object
-/domain/repository

と要素をentity、value object、repositoryの３つに分けています。

### /infrastructure

インフラストラクチャ層のコードを配置します。  
各種repositoryはdomain層で定義されているinterfaceに依存させる形で実装します。

-/infrastructure/mock_data
また、DBを作成する前にmockのDBをtypescriptのclassで作成しています。
このmockのDBでは、登録したデータはサーバーが起動している間のみ保持され、再起動の際にはデータは消失します。

### /di

DIコンテナの設定ファイルを配置します。

DIはinversifyJSを利用しています。(https://github.com/inversify/InversifyJS)

依存される側のクラスは@injectable()を付与し、依存する場合には@inject()で依存先のclassのinterfaceに依存するようにします。
また、types.tsでTYPEを定義したのち、コンテナ設定で各コンテナに関してinterfaceとclassをbindします。これにより依存関係の解決を自動で行ってくれます。