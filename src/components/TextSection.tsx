export const TextSection = () => {
  return (
    <div id="container">
      <div className="hero-panel">
        <h1>WebGL2</h1>
        <p>Interactive 3D and 2D graphics</p>
        <p>No need for plugins.</p>
      </div>

      <div className="content-panel">
        <h2>Advanced Texture Handling</h2>
        <p>More control over textures, 3D textures, multisample textures</p>
        <p>Higher-quality graphics for games and applications.</p>
      </div>

      <div className="content-panel">
        <h2>Transform Feedback</h2>
        <p>
          Allows WebGL2 to capture output from the vertex shader and store it in
          a buffer.
        </p>
        <p>
          Useful in particle systems, physics, where you need to re-use the
          output of the vertex shader.
        </p>
      </div>

      <div className="content-panel">
        <h2>Multiple Render Targets (MRT)</h2>
        <p>Write to multiple textures simultaneously</p>
        <p>
          Allows for more advanced shading techniques like deferred rendering.
        </p>
      </div>

      <div className="content-panel">
        <h2>Geometry Instancing</h2>
        <p>Lets you render many instances more efficiently.</p>
        <p>
          Reduces the overhead and is useful in rendering large numbers of
          objects, like vegetation, particles, or crowds.
        </p>
      </div>

      <div className="content-panel">
        <h2>Uniform Buffer Objects (UBOs)</h2>
        <p>Allow data sharing between multiple shaders.</p>
        <p>More efficient management of global variables.</p>
      </div>

      <div className="hero-panel" id="footer">
        <h1>Explore More</h1>
        <p>New possibilities for web-based graphics</p>
        <p>
          Dive deeper, check out the
          <a
            href="https://registry.khronos.org/webgl/specs/latest/2.0/"
            target="_blank"
            rel="noopener noreferrer"
          >
            official documentation.
          </a>
        </p>
      </div>
    </div>
  );
};
