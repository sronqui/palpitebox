import { GoogleSpreadsheet } from 'google-spreadsheet'
import { processEnv } from 'next/dist/lib/load-env-config'

const doc = new GoogleSpreadsheet(processEnv.SHEET_DOC_ID)

// npm run build
// npm run start

export default async (req, res) =>
{
  try
  {
    await doc.useServiceAccountAuth(
      {
        client_email: processEnv.SHEET_CLIENT_EMAIL,
        private_key: processEnv.SHEET_PRIVATE_KEY
      })

    await doc.loadInfo()

    const sheet = doc.sheetsByIndex[2]
    await sheet.loadCells('A3:B3')

    const mostrarPromocaoCell = sheet.getCell(2, 0)
    const textoCell = sheet.getCell(2, 1)

    res.end(JSON.stringify({
      showCoupon: mostrarPromocaoCell.value === 'VERDADEIRO',
      message: textoCell.value
    }))
  }
  catch (err)
  {
    res.end(JSON.stringify({
      showCoupon: false,
      message: err
    }))
  }
}