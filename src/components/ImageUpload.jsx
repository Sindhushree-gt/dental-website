import React, { useState } from 'react';

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const simulatePreview = async () => {
    setLoading(true);
    // Simulate API call to Node.js backend
    setTimeout(() => {
      setLoading(false);
      setResult(preview); // In real AI, this would be the processed image
    }, 3000);
  };

  return (
    <div className="max-w-4xl mx-auto py-20 px-6">
      <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-black/5">
        <div className="md:flex">
          {/* Upload Section */}
          <div className="md:w-1/2 p-12 bg-[color:var(--deep)] text-white">
            <h2 className="text-3xl font-serif font-bold mb-6">AI Smile Preview</h2>
            <p className="text-white/70 mb-8 leading-relaxed">
              Upload a photo of your smile, and our AI will simulate your perfect transformation with veneers, aligners, or whitening.
            </p>
            
            <label className="block w-full border-2 border-dashed border-white/20 rounded-2xl p-10 text-center cursor-pointer hover:bg-white/5 transition-colors">
              <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
              <div className="text-4xl mb-4">📸</div>
              <span className="font-bold">Select Photo</span>
              <p className="text-xs text-white/50 mt-2">JPG, PNG up to 10MB</p>
            </label>

            {preview && (
              <button 
                onClick={simulatePreview}
                disabled={loading}
                className="w-full mt-8 bg-[color:var(--teal)] text-white py-4 rounded-xl font-bold text-lg hover:bg-[color:var(--dk)] disabled:opacity-50 transition-all shadow-xl shadow-black/30"
              >
                {loading ? 'AI Processing...' : 'Simulate Future Smile'}
              </button>
            )}
          </div>

          {/* Result Section */}
          <div className="md:w-1/2 p-12 bg-[color:var(--bg)] flex items-center justify-center">
            {!preview ? (
              <div className="text-center text-gray-400">
                <div className="text-6xl mb-4">⌛</div>
                <p>Upload a photo to see the magic</p>
              </div>
            ) : (
              <div className="w-full h-full flex flex-col items-center">
                <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-inner bg-black">
                  <img src={preview} className={`w-full h-full object-cover transition-all duration-1000 ${loading ? 'blur-md opacity-50' : 'blur-0 opacity-100'}`} alt="Preview" />
                  {loading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 border-4 border-[color:var(--teal)] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                  {result && !loading && (
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[color:var(--teal)] text-white px-6 py-2 rounded-full font-bold shadow-lg animate-bounce">
                      AI Preview Applied ✨
                    </div>
                  )}
                </div>
                <p className="mt-6 text-sm text-gray-400 text-center">
                  * This is an AI-generated simulation. Clinical results may vary.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
