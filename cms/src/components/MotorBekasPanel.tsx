import React, { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

export function MotorBekasPanel() {
  const [motorcycles, setMotorcycles] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  // Form states
  const [name, setName] = useState('')
  const [brand, setBrand] = useState('Honda')
  const [year, setYear] = useState(2022)
  const [priceMin, setPriceMin] = useState(0)
  const [priceMax, setPriceMax] = useState(0)
  const [imageUrl, setImageUrl] = useState('')
  const [engineCapacity, setEngineCapacity] = useState('150cc')
  const [transmission, setTransmission] = useState('Matic')
  const [mileage, setMileage] = useState('10.000 km')

  useEffect(() => {
    fetchMotorcycles()
  }, [])

  const fetchMotorcycles = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('motorcycles').select('*').order('created_at', { ascending: false })
    if (error) {
      console.error('Error fetching data:', error)
    } else {
      setMotorcycles(data || [])
    }
    setLoading(false)
  }

  const addMotorcycle = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.from('motorcycles').insert([
      {
        name,
        brand,
        year,
        price_min: priceMin,
        price_max: priceMax,
        image_url: imageUrl,
        engine_capacity: engineCapacity,
        transmission,
        mileage
      }
    ])

    if (error) {
      alert('Gagal menambahkan data: ' + error.message)
    } else {
      alert('Data motor berhasil ditambahkan!')
      fetchMotorcycles()
      setName('')
      setImageUrl('')
    }
  }

  const generateConfig = async () => {
    const config = {
      admob_config: {
        native_ad_id: "ca-app-pub-3940256099942544/2247696110",
        interstitial_ad_id: "ca-app-pub-3940256099942544/1033173712",
        native_ad_frequency: 6,
        interstitial_ad_frequency: 3
      },
      slideshow: [], 
      used_motorcycles: motorcycles.map(m => ({
        id: m.id,
        name: m.name,
        brand: m.brand,
        year: m.year,
        price_min: m.price_min,
        price_max: m.price_max,
        image_url: m.image_url,
        specs: {
          engine_capacity: m.engine_capacity,
          transmission: m.transmission,
          mileage: m.mileage
        }
      })),
      marketplaces: [],
      news_articles: []
    }

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(config, null, 2))
    const downloadAnchorNode = document.createElement('a')
    downloadAnchorNode.setAttribute("href", dataStr)
    downloadAnchorNode.setAttribute("download", "config-motor-bekas.json")
    document.body.appendChild(downloadAnchorNode)
    downloadAnchorNode.click()
    downloadAnchorNode.remove()
  }

  return (
    <div className="panel-content">
      <header className="header-actions">
        <h2>Panel Manajemen Motor Bekas</h2>
        <button className="btn-primary" onClick={generateConfig}>⬇ Generate config.json</button>
      </header>

      <div className="grid-layout">
        <section className="form-section">
          <h3>Tambah Motor Baru</h3>
          <form onSubmit={addMotorcycle} className="motor-form">
            <div className="form-group">
              <label>Nama Motor</label>
              <input type="text" required value={name} onChange={e => setName(e.target.value)} />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Merek</label>
                <select value={brand} onChange={e => setBrand(e.target.value)}>
                  <option>Honda</option>
                  <option>Yamaha</option>
                  <option>Suzuki</option>
                  <option>Kawasaki</option>
                </select>
              </div>
              <div className="form-group">
                <label>Tahun</label>
                <input type="number" required value={year} onChange={e => setYear(parseInt(e.target.value))} />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Harga Minimal (Rp)</label>
                <input type="number" required value={priceMin} onChange={e => setPriceMin(parseInt(e.target.value))} />
              </div>
              <div className="form-group">
                <label>Harga Maksimal (Rp)</label>
                <input type="number" required value={priceMax} onChange={e => setPriceMax(parseInt(e.target.value))} />
              </div>
            </div>

            <div className="form-group">
              <label>URL Gambar</label>
              <input type="url" required value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Kapasitas Mesin</label>
                <input type="text" required value={engineCapacity} onChange={e => setEngineCapacity(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Transmisi</label>
                <select value={transmission} onChange={e => setTransmission(e.target.value)}>
                  <option>Matic</option>
                  <option>Manual</option>
                  <option>Kopling</option>
                </select>
              </div>
              <div className="form-group">
                <label>Jarak Tempuh</label>
                <input type="text" required value={mileage} onChange={e => setMileage(e.target.value)} />
              </div>
            </div>

            <button type="submit" className="btn-success">Simpan Data</button>
          </form>
        </section>

        <section className="table-section">
          <h3>Daftar Motor</h3>
          {loading ? (
            <p>Memuat data...</p>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Gambar</th>
                  <th>Nama</th>
                  <th>Tahun</th>
                  <th>Harga Max</th>
                </tr>
              </thead>
              <tbody>
                {motorcycles.map(m => (
                  <tr key={m.id}>
                    <td>
                      <img src={m.image_url} alt={m.name} width="50" style={{ borderRadius: '4px' }} />
                    </td>
                    <td>{m.name}</td>
                    <td>{m.year}</td>
                    <td>Rp {m.price_max.toLocaleString('id-ID')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </div>
    </div>
  )
}
