import Link from 'next/link'
import Layout from '../components/Layout'

const clickButton = async () => {
  const response = await fetch('api/get-posts', {
    method: 'POST',
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify({foo: 'bar'}) // body data type must match "Content-Type" header
  });
  const json = response.json(); // parses JSON response into native JavaScript objects
  console.log('json', json)
}

const IndexPage = () => (
  <Layout title="Home | Next.js + TypeScript Example">
    <h1>Hello Next.js 👋</h1>
    <p>
      <Link href="/about">
        <a>About</a>
      </Link>
    </p>
    <button onClick={clickButton}>test api</button>
  </Layout>
)

export default IndexPage
