import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { postRating } from '../services/api';
import { useParams, Link } from 'react-router-dom'; 
import { useTranslation } from 'react-i18next';
import ProductCard from '../components/ProductCard';

function ProductDetail() {
  const { id } = useParams(); 

  const [product, setProduct] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [myScore, setMyScore] = useState(5);
  const [related, setRelated] = useState([]);
  // comments removed: only collect score
  const [submitting, setSubmitting] = useState(false);

  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  useEffect(() => {
    const apiUrl = `https://coconut-knowledge-hub-public.onrender.com/api/products/${id}?lang=${currentLang}`;
    axios.get(apiUrl) 
      .then(response => {
        setProduct(response.data); 
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching product:", error);
        setLoading(false);
      });
  }, [id, currentLang]);

  // Fetch related products (same category) once product is loaded
  useEffect(() => {
    if (!product || !product.category) return;
    const fetchRelated = async () => {
      try {
        const resp = await axios.get('http://localhost:8080/api/products', {
          params: { lang: currentLang, category: product.category }
        });
        const list = resp.data || [];
        const filtered = list.filter(p => p.id !== product.id).slice(0, 4);
        setRelated(filtered);
      } catch (err) {
        console.error('Failed to fetch related products', err);
      }
    };
    fetchRelated();
  }, [product, currentLang]);

  if (loading) {
    return <div>Loading product details...</div>;
  }

  if (!product) {
    return <h2>Product not found.</h2>; 
  }

  const backendHost = 'http://localhost:8080';
  const normalizeImageUrl = (url) => {
    if (!url) return null;
    if (url.startsWith('http')) return url;
    if (url.startsWith('/api/public/uploads/')) return `${backendHost}${url}`;
    if (url.startsWith('/uploads/')) return `${backendHost}/api/public/uploads/${url.substring('/uploads/'.length)}`;
    return `${backendHost}${url}`;
  };
  const imageSrc = normalizeImageUrl(product.imageUrl);
  return (
    <div>
      <Link to="/products">← กลับไปหน้า Catalog</Link>

      <h2>{product.name}</h2>
      {imageSrc && (
        <div style={{ margin: '1rem 0' }}>
          <img src={imageSrc} alt={product.name} style={{ maxWidth: '100%', height: 'auto' }} />
        </div>
      )}
      <p><strong>Description:</strong> {product.description}</p>
      <p><strong>Price:</strong> {product.price} / {product.unit}</p>
      <p><strong>Category:</strong> {product.category}</p>
      <p><strong>Rating:</strong> {product.rating ? product.rating : 'N/A'} ⭐</p>
      <p><strong>Product_ID:</strong> {product.id}</p>

      {product.manufacturerName && (
        <div>
          <p><strong>By:</strong> {product.manufacturerName}</p>
          <p><strong>Contact:</strong> {product.manufacturerEmail ? product.manufacturerEmail : product.manufacturerPhone}</p>
        </div>
      )}

      <hr />
      <h3>Rate this product</h3>
      <div>
        <label>Score: </label>
        <select value={myScore} onChange={e => setMyScore(parseInt(e.target.value))}>
          {[5,4,3,2,1].map(s => (
            <option key={s} value={s}>{s} ⭐</option>
          ))}
        </select>
      </div>
      {/* Comment field removed — only score is collected */}
      <div style={{ marginTop: '0.5rem' }}>
        <button onClick={async () => {
          setSubmitting(true);
          try {
            await postRating(product.id, { score: myScore });
            // refresh product
            const apiUrl = `http://localhost:8080/api/products/${id}?lang=${currentLang}`;
            const resp = await axios.get(apiUrl);
            setProduct(resp.data);
          } catch (err) {
            console.error('Failed to submit rating', err);
            alert('Failed to submit rating. Are you logged in?');
          } finally {
            setSubmitting(false);
          }
        }} disabled={submitting}>Submit</button>
      </div>

      {related && related.length > 0 && (
        <section style={{ marginTop: '2rem' }}>
          <h3>สินค้าที่เกี่ยวข้อง</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {related.map(r => (
              <ProductCard key={r.id} product={r} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default ProductDetail;