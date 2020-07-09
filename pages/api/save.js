import { GoogleSpreadsheet } from 'google-spreadsheet'
import moment from 'moment'
import { processEnv } from 'next/dist/lib/load-env-config'
import { fromBase64 } from '../../utils/base64'

const doc = new GoogleSpreadsheet(processEnv.SHEET_DOC_ID)

const genCupom = () =>
{
  const code = parseInt(moment().format('YYMMDDHHmmssSSS')).toString().toUpperCase()
  return code.substr(0, 4) + '-' + code.substr(4, 4) + '-' + code.substr(8, 4)
}

export default async (req, res) =>
{
  try
  {
    await doc.useServiceAccountAuth(
      {
        client_email: processEnv.SHEET_CLIENT_EMAIL,
        private_key: fromBase64(processEnv.SHEET_PRIVATE_KEY)
      })
    await doc.loadInfo()

    const sheet = doc.sheetsByIndex[1]
    const data = JSON.parse(req.body)

    const sheetConfig = doc.sheetsByIndex[2]
    await sheetConfig.loadCells('A2:B2')

    const mostrarPromcaoCell = sheet.getCell(2, 0)
    const textoCell = sheet.getCell(2, 1)

    let Cupom = ''
    let Promo = ''

    if (mostrarPromcaoCell.value === 'VERDADEIRO')
    {
      Cupom = genCupom()
      Promo = textoCell.value
    }

    await sheet.addRow({
      Nome: data.Nome,
      Email: data.Email,
      WhatsApp: data.WhatsApp,
      Cupom: Cupom,
      Promo: Promo,
      'Data Preencimento': moment().format('DD/MM/YYYY, HH:mm:ss'),
      Nota: parseInt(data.Nota)
    })

    res.end(JSON.stringify({
      showCupom: Cupom !== '',
      Cupom,
      Promo
    }))
  }
  catch (err)
  {
    console.log(err);
    res.end('error')
  }
}