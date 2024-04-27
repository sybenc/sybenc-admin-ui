import { exampleModel } from './type/hello'
import httpRequest from "@/api/axios.ts";

enum API {
    example = '/user/list'
}

export const exampleAPI = () => {
    return httpRequest.get<exampleModel[]>({ url: API.example })
}
