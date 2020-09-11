export const KEY_GEOCODING = 'AIzaSyBIUznZ3R5kUfLoEYz-pJPLHXV2eY_G8Ak';
export const URL_GEOCODING = 'https://maps.googleapis.com/maps/api/geocode/json?address=';

export function return_URL_GEOCODING(pathAddress: string) {
    const url = `${URL_GEOCODING}${pathAddress}key=${KEY_GEOCODING}`;
    return url;
}