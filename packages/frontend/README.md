# notification-app-backend

## 概要

SSEによる通知機能を実装するためのフロントエンドリポジトリです。  
FrontendはNext.jsを基盤に実装しています。(https://expressjs.com/)
主な機能としては通知を受け取った際のブラウザのfaviconへのバッジ数の反映とトーストの表示です。

## ディレクトリ構成

### /app

nextの app router で使用するページを配置するディレクトリです。

### /domain

アプリケーションで利用するドメインを配置するディレクトリです

### /infrastructure

インフラストラクチャ層のコードを配置します。  
各種clientやrepositoryはdomain層で定義されているinterfaceに依存させる形で実装します。

主に API とのやりとりを repositoryで定義します。

### /ui

アプリケーションで利用するUIコンポーネントを配置するディレクトリです。

#### /components

uiコンポーネントを配置します。

#### /hooks

カスタムフックを配置するディレクトリです。

#### /vm

View modelを配置するディレクトリです VMは画面の状態を管理するために利用します。
