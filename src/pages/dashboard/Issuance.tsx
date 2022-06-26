import { useTranslation } from "react-i18next"
import { useSupply } from "data/queries/bank"
import { useMemoizedCalcValue } from "data/queries/oracle"
import { Card } from "components/layout"
import { Read } from "components/token"
import DashboardContent from "./components/DashboardContent"
import SelectDenom from "./components/SelectDenom"

const Issuance = () => {
  const { t } = useTranslation()
  const title = t("Issuance")

  const { data, ...state } = useSupply()
  const calcValue = useMemoizedCalcValue()

  const render = () => {
    if (!data) return null

    //const amount = data.find((item) => item.denom === "uluna")?.amount ?? "0"
    const amount = 0;
    const value = <Read amount={amount} denom="uflash" prefix />

    const list = data
      .map((item) => ({ ...item, value: calcValue(item) }))
      .filter((value, index) => {return value.denom != "uluna"})
      .sort(({ value: a }, { value: b }) => Number(b) - Number(a))
    list.push({
      denom: "uflash",
      amount: "0",
      value: 0
    })
    return (
      <DashboardContent
        value={value}
        footer={<SelectDenom title={title} list={list} />}
      />
    )
  }

  return (
    <Card {...state} title={title} size="small">
      {render()}
    </Card>
  )
}

export default Issuance
