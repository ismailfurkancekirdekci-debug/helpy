Helpy - React Native Günlük AI Bot Uygulaması

Bu proje React Native CLI kullanılarak geliştirilmiş bir mobil uygulamadır. Android cihaz veya emulatörde çalıştıralabilir.

Gereksinimler:
- Node.js (18+)
- npm veya yarn
- JDK 17
- Android Studio ve Android SDK
- USB hata ayıklama açık Android cihaz (geliştirici seçenekleri açık olmalı) veya emulatör

Projeyi İndirme ve Yükleme:
Powershell kullanarak
- git clone https://github.com/ismailfurkancekirdekci-debug/helpy.git
- cd helpy 
kodlarını kullanarak yükleyebilirsiniz.

(Önerilen)
- Öncelikle kendi projects klasörünüze ya da herhangi bir yere yeni klasör açın örn; "testhelpy".
- Github reposunun üstündeki "Code" butonuna tıklayarak zip formatı halinde gerekli dosyaları indirin.
- Son olarak içindeki dosyaları açtığımız yeni proje klasörünün içine çıkartabiliriz.

Kurulum:
- VsCode içerisinde open folder yaparak proje klasörümüzü açalım.
- Yeni terminal oluşturalım ve " npm install " yazarak çalıştıralım.

Uygulamayı Çalıştırma (Android):
İlk olarak Metro Bundler'i başlatın:
-npx react-native start

Yeni bir terminal açıp uygulamayı başlatın:
-Öncelikle telefonunuzu kabloyla bilgisayara bağlayınız.
-npx react-native run-android komutunu çalıştırarak telefona yükleyin.

Sorun Çıkarsa:
npx react-native start --reset-cache

Notlar:
- Proje boyunca kodun bir kısmında sadece ChatGpt'den yardım alınmıştır.
- Free AI api olarak Gemini 2.5 flash kullanılmıştır.
- Projede duygu analizi ve metin özetleme işlemleri Google Gemini 2.5 Flash modeli kullanılarak gerçekleştirilmiştir. Model API aracılığıyla çağrılmakta ve JSON formatında çıktı üretmektedir. Analiz edilen veriler kullanıcı cihazında tutulmakta ve üçüncü taraf sunuculara kaydedilmemektedir.
