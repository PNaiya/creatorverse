import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../client.js';

function AddCreator() {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const { error } = await supabase.from('creators').insert([
      {
        name,
        url,
        description,
        imageURL: imageURL || null,
      },
    ]);

    setSaving(false);

    if (error) {
      setError(error.message);
    } else {
      navigate('/'); // back to list
    }
  }

  return (
    <section>
      <h2>Add Creator</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label>
          URL
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </label>

        <label>
          Description
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>

        <label>
          Image URL (optional)
          <input
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
          />
        </label>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit" disabled={saving}>
          {saving ? 'Saving...' : 'Create'}
        </button>
      </form>
    </section>
  );
}

export default AddCreator;
