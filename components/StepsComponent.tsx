import { Steps } from 'primereact/steps'

export function StepsComponent() {
  const items = [
    {
      label: 'Cantidad y entrega'
    },
    {
      label: 'Informarción del destinario'
    },
    {
      label: 'Detalles del pago'
    },
    {
      label: 'Pagar'
    }
  ]

  return (
    <div
      className="steps-demo"
      style={{
        marginBottom: '60px'
      }}
    >
      <Steps model={items} />
    </div>
  )
}
