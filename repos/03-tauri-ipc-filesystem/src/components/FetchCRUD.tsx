import { useState } from 'react';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const BASE_URL = "https://jsonplaceholder.typicode.com";

// GET
async function obtenerPosts(): Promise<Post[]> {
  const res = await fetch(`${BASE_URL}/posts`);
  if (!res.ok) throw new Error(`Error ${res.status}`);
  return (await res.json()) as Post[];
}

// GET by ID
export async function obtenerPost(id: number): Promise<Post> {
  const res = await fetch(`${BASE_URL}/posts/${id}`);
  if (!res.ok) throw new Error(`Error ${res.status}`);
  return (await res.json()) as Post;
}

// POST
async function crearPost(datos: Omit<Post, "id">): Promise<Post> {
  const res = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });
  return (await res.json()) as Post;
}

// PUT (reemplazar completo)
export async function actualizarPost(id: number, datos: Post): Promise<Post> {
  const res = await fetch(`${BASE_URL}/posts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });
  return (await res.json()) as Post;
}

// DELETE
async function eliminarPost(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/posts/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`Error ${res.status}`);
}

function FetchCRUD() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [status, setStatus] = useState("");

  const handleGetPosts = async () => {
    try {
      setStatus("Cargando posts...");
      const data = await obtenerPosts();
      setPosts(data.slice(0, 5));
      setStatus(`Obtenidos ${data.length} posts (mostrando 5)`);
    } catch (error) {
      setStatus(`Error: ${(error as Error).message}`);
    }
  };

  const handleCreatePost = async () => {
    try {
      setStatus("Creando post...");
      const nuevo = await crearPost({
        userId: 1,
        title: "Nuevo post desde Tauri",
        body: "Contenido del post creado con POST",
      });
      setStatus(`Post creado con id: ${nuevo.id}`);
    } catch (error) {
      setStatus(`Error: ${(error as Error).message}`);
    }
  };

  const handleDeletePost = async (id: number) => {
    try {
      setStatus(`Eliminando post ${id}...`);
      await eliminarPost(id);
      setStatus(`Post ${id} eliminado`);
    } catch (error) {
      setStatus(`Error: ${(error as Error).message}`);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={handleGetPosts} style={{ marginRight: '0.5rem' }}>
          GET Posts
        </button>
        <button onClick={handleCreatePost} style={{ marginRight: '0.5rem' }}>
          POST Crear Post
        </button>
      </div>
      {status && <p style={{ color: '#569cd6' }}>{status}</p>}
      {posts.length > 0 && (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <strong>{post.title}</strong>
              <button onClick={() => handleDeletePost(post.id)} style={{ marginLeft: '0.5rem' }}>
                DELETE
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FetchCRUD;
