export type ImagesDataModel = {
  contentfulType: string
  id: string
  image: Image
  linkText: string
  linkUrl: string
  title: string
}

type Image = {
  contentType: string
  description: string
  details: {
    images: {
      height: number
      width: number
      size: number
    }
  }
  fileName: string
  id: string
  title: string
  url: string

}