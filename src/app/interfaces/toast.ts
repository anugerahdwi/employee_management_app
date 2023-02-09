import { IndividualConfig } from 'ngx-toastr';

export interface Toast {
    message: string;
    title: string;
    type: string;
    ic: IndividualConfig;
}
