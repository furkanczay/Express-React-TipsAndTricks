function slugify(str) {
      // Türkçe karakterleri değiştirmek için bir harita oluştur
      const charMap = {
        'ğ': 'g',
        'ü': 'u',
        'ş': 's',
        'ı': 'i',
        'ö': 'o',
        'ç': 'c',
        'Ğ': 'G',
        'Ü': 'U',
        'Ş': 'S',
        'İ': 'I',
        'Ö': 'O',
        'Ç': 'C'
      };
    
      // Türkçe karakterleri değiştir
      str = str.replace(/[ğüşıöçĞÜŞİÖÇ]/g, function(match) {
        return charMap[match];
      });
    
      // Boşlukları kaldır, tüm harfleri küçült ve özel karakterleri temizle
      return str
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-') // Birden fazla tireyi tek bir tireye dönüştür
        .replace(/^-|-$/g, ''); // Başlangıç ve bitişteki tireleri kaldır
}

module.exports = slugify;