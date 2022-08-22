import { AxiosHttpClient } from '@/infra/http/axiosHttpClient'

export const makeAxiosHttpClient = (): AxiosHttpClient => new AxiosHttpClient()