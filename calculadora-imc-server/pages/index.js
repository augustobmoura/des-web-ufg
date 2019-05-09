import Head from 'next/head';
import { withRouter } from 'next/router';

const getCategoriaIMC = imc => {
  if (imc <= 18.5) return 'Abaixo do peso';
  if (imc <= 24.9) return 'Peso normal';
  if (imc <= 29.9) return 'Sobrepeso';
  if (imc <= 34.9) return 'Obesidade grau 1';
  if (imc <= 39.9) return 'Obesidade grau 2';

  return 'Obesidade grau 3';
};

const formatNum = num => {
  const str = num.toLocaleString('pt-BR', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });

  if (str[str.length - 3] === '.') {
    return str
      .split('.')
      .map(s => s.replace(/,/, '.'))
      .join(',');
  }

  return str;
};

const Resultado = ({ altura, peso }) => {
  if (altura === 0 || altura === undefined || peso === undefined) {
    return (
      <p className="resultado__response alert alert-danger">
        Valores inválidos para peso e/ou altura. Por favor verifique se os dados
        estão corretos e tente novamente
      </p>
    );
  }

  const imc = peso / altura ** 2;

  return (
    <div className="resultado__response text-center">
      <style jsx>{`
        .result-imc {
          width: min-content;
          font-weight: bold;
          padding: 10px;
          margin: 5px auto;
        }
      `}</style>
      O seu IMC é
      <div className="result-imc rounded border border-secondary">
        {formatNum(Number(imc))}
      </div>
      Você está na categoria: {getCategoriaIMC(imc)}
    </div>
  );
};

const Home = ({
  router: {
    query: { altura, peso },
  },
}) => (
  <>
    <Head>
      <link
        rel="stylesheet"
        href="https://unpkg.com/bootstrap@4.3.1/dist/css/bootstrap.css"
      />
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
        integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf"
        crossOrigin="anonymous"
      />
    </Head>

    <style jsx>{`
      .principal {
        width: 100%;
        max-width: 900px;
        margin: 20px auto;
        padding: 20px;
      }

      .form-calc-imc__actions {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
      }

      .alert {
        margin-bottom: 0;
      }

      .resultado__response {
        margin-top: 20px;
      }
    `}</style>

    <nav className="navbar navbar-dark bg-dark">
      <span className="navbar-brand">Calculadora IMC</span>
    </nav>

    <main className="principal shadow rounded bg-white">
      <form className="form-calc-imc" action="">
        <div className="form-group">
          <label htmlFor="altura-input">Altura:</label>

          <div className="input-group">
            <input
              className="form-control"
              name="altura"
              id="altura-input"
              type="number"
              min="0"
              step="0.01"
              defaultValue={altura}
              placeholder="Sua altura"
            />

            <div className="input-group-append">
              <div className="input-group-text">m</div>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="peso-input">Peso:</label>

          <div className="input-group">
            <input
              className="form-control"
              name="peso"
              id="peso-input"
              type="number"
              min="0"
              step="0.01"
              defaultValue={peso}
              placeholder="Seu peso"
            />

            <div className="input-group-append">
              <div className="input-group-text">kg</div>
            </div>
          </div>
        </div>

        <div className="form-calc-imc__actions">
          <button
            type="submit"
            className="calc-imc-actions__submit-btn btn btn-primary"
          >
            Calcular
          </button>
        </div>
      </form>

      {altura && peso && (
        <div className="resultado">
          <Resultado altura={altura} peso={peso} />
        </div>
      )}
    </main>
  </>
);

export default withRouter(Home);
