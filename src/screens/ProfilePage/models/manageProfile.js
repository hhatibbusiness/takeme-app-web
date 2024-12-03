export async function GetProfileData(mLocale, localeId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const response = {
        id: 12345, // Personal profile ID
        baseProfile: {
          id: 67890, // Profile ID
          type: "Person",
          profileImg: {
            id: "img123",
            url: "",
            fileName: "profile.jpg",
            mimeType: "image/jpeg",
            size: 12345, // size in bytes
          },
          description: {
            id: "desc123",
            text: `This is a description for the profile in ${mLocale}`,
            language: mLocale,
          },
          location: {
            id: "loc123",
            place: {
              id: "place123",
              name: `Sample Place in ${mLocale}`,
              country: "مصر",
              city: `City (${mLocale})`,
            },
            buildingNumber: "101",
            floorNumber: "2",
            roomNumber: "202",
            latitude: 37.7749, // Example coordinate
            longitude: -122.4194, // Example coordinate
            postalCode: "12345",
            translationsResponseDto: {
              localeId: localeId,
              sourceId: "loc123",
              translationsInitMethod: "MANUAL",
              translations: [
                { street_name: `Street in ${mLocale}` },
                { comments: `Comments in ${mLocale}` },
              ],
            },
          },
          urlPostfix: `/profiles/67890`,
        },
        dateOfBirth: {'year': '2000', 'month': '08', 'day': '21', 'isDisabled': true},
        gender: 1,
        translationsResponseDto: {
          localeId: localeId,
          sourceId: "67890",
          translationsInitMethod: "AUTO",
          translations: [
            { name: `Hussien Khateb` },
            { display_name: 'حسين خطيب' },
          ],
        },
        availableTranslations: ["en", "es", "fr"],
      };

      resolve(response);
    }, 2000);
  });
}