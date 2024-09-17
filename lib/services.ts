import { API_CONNECTOR } from "./apiConnector"

export const getBanners = async () => {
  try {
    const { get } = API_CONNECTOR({})
    const path = `/main-banner/all`
    const data = await get(path)
    return Promise.resolve(data)
  } catch (error) {
    return Promise.reject(error)
  }
}

export const getShortcuts = async () => {
  try {
    const { get } = API_CONNECTOR({})
    const path = `/main-shortcut/all`
    const data = await get(path)
    return Promise.resolve(data)
  } catch (error) {
    return Promise.reject(error)
  }
};

export const getCollections = async () => {
  try {
    const { get } = API_CONNECTOR({})
    const path = `/collections?prearrangedDiscount`
    const data = await get(path)
    return Promise.resolve(data)
  } catch (error) {
    return Promise.reject(error)
  }
};

