export const KEY_GEOCODING = 'AIzaSyAXqjfKU4oPf35zd2nTLBGgMaD3FE9ZIKE';
export const URL_GEOCODING = 'https://maps.googleapis.com/maps/api/geocode/json?address=';

export function return_URL_GEOCODING(pathAddress: string) {
    const url = `${URL_GEOCODING}${pathAddress}&key=${KEY_GEOCODING}`;
    return url;
}