

export type CARD_TYPE = 'visa' | 'mastercard' | 'discover' | 'amex' | 'jcb' | 'dinersclub' | 'maestro' | 'laser' | 'unionpay' | 'elo' | 'hipercard' | 'troy'


export type CreditCardProps = {
  
  acceptedCards?: Array<CARD_TYPE>,
  callback?: ({issuer, maxLength, validNumber}:{issuer: string, maxLength: number, validNumber: boolean})=> void,
  cvc: string | number,
  expiry: string | number,
  focused: string,
  issuer?: string,
  locale?: {
    valid: string,
  },
  name: string,
  number: string | number,
  placeholders?: {
    name?: string,
    number?: string,
    expiry?: string,
    cvc?: string,
  },
  preview?: boolean,
  token?: CCS_Props

}

export type CCS_Props={
  width?: number
  ratio?: number
  background?: string
  unknown_background?: string
  light_text_color?: string
  dark_text_color?: string
  shadow?: string
  stripe_bg_color?: string
  signature_bg_color?: string
  animate_background?: boolean | true
  background_transition?: string

  name_font_size?: number
  name_font_family?: string
  number_font_size?: number
  number_font_family?: string
  expiry_font_size?: number
  expiry_font_family?: string
  valid_font_size?: number
  cvc_font_size?: number
  cvc_font_family?: string
  cvc_color?: string

  amex_background?: string
  visa_background?: string
  mastercard_background?: string
  discover_background?: string
  dankort_background?: string
  diners_background?: string
  jcb_background?: string
  maestro_background?: string
  rupay_background?: string
  hipercard_background?: string
  elo_background?: string
  
  visa_logo?: string
  visaelectron_logo?: string
  unionpay_logo?: string
  maestro_logo?: string
  mastercard_logo?: string
  rupay_logo?: string
  hipercard_logo?: string
  elo_logo?: string
  diners_logo?: string
  jcb_logo?: string
  laser_logo?: string
  amex_logo?: string
  dankort_logo?: string
  discover_logo?: string
  chip_image?: string
}