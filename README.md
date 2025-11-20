Helpy - React Native Uygulaması

Bu proje React Native CLI kullanılarak geliştirilmiş bir mobil uygulamadır. Android cihaz veya emulatörde çalıştıralabilir.

Gereksinimler:
- Node.js (18+)
- npm veya yarn
- JDK 17
- Android Studio ve Android SDK
- USB hata ayıklama açık Android cihaz (geliştirici seçenekleri açık olmalı) veya emulatör

Projeyi İndirme ve Yükleme:
git clone https://github.com//helpy.git
cd helpy
npm install

API Anahtari (Varsa):
Proje dizininde .env dosyasi olusturun.
API_KEY=BURAYA_YAZ

Uygulamayi Calistirma (Android):
Ilk olarak Metro Bundler'i baslatin:
npx react-native start

Yeni bir terminal acip uygulamayi baslatin:
npx react-native run-android

Sorun Cikarsa:
npx react-native start --reset-cache

Notlar:
- node_modules, build, Pods, .bundle gibi klasorler repoya eklenmez.
- Proje React Native CLI iledir, Expo degildir.

