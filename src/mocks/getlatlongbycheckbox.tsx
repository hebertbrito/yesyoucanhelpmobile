import { addressSendBranch, addressesDropdown } from '../data/dataOrderscreen'

export function GetLatLongByCheckBox(checked: string, dropdownvalueaddress: string) {

    let _lat = 0;
    let _long = 0;

    if (checked == 'ChoseMPlace') {

        const SearchPrevistLocation = addressesDropdown.find(
            item => item.address == dropdownvalueaddress
        )

        _lat = SearchPrevistLocation?.lat!;
        _long = SearchPrevistLocation?.long!;

    } else {

        _lat = addressSendBranch.lat;
        _long = addressSendBranch.long;

    }

    const response = {
        lat: _lat,
        long: _long
    }

    return response;

}