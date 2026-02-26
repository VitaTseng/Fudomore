import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStores } from '../hooks/useStores';
import StatusBar from './StatusBar';

const ChooseStoreModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { stores, loading } = useStores();
  const [searchQuery, setSearchQuery] = useState('');

  // Filter stores based on search query
  const filteredStores = useMemo(() => {
    if (!searchQuery) return stores;
    
    const query = searchQuery.toLowerCase();
    return stores.filter(store => 
      store.name.toLowerCase().includes(query) ||
      store.address?.toLowerCase().includes(query)
    );
  }, [stores, searchQuery]);

  const handleStoreClick = (storeId) => {
    onClose();
    navigate(`/store/${storeId}`);
  };

  const scrollToTop = () => {
    document.getElementById('store-list')?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50" onClick={onClose}>
      <div 
        className="absolute inset-0 top-[54px] bg-white rounded-tl-[38px] rounded-tr-[38px] shadow-[0px_15px_75px_0px_rgba(0,0,0,0.18)] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Fixed Status Bar */}
        <div className="fixed left-0 right-0 top-0 z-40">
          <StatusBar />
        </div>

        {/* Modal Header */}
        <div className="flex flex-col items-center pb-2.5 pt-0 shrink-0 w-full">
          {/* Grabber */}
          <div className="flex flex-col h-4 items-center pt-[5px] shrink-0 w-full">
            <div className="bg-[#cfcfcf] h-[5px] rounded-full shrink-0 w-9" />
          </div>
          
          {/* Title and Controls */}
          <div className="flex items-center justify-between px-4 relative w-full h-11">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-11 h-11 flex items-center justify-center rounded-full transition-opacity hover:opacity-70"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="#999999"/>
              </svg>
            </button>

            {/* Title */}
            <p className="absolute left-[66px] right-[66px] font-poppins font-semibold text-[17px] text-text-main text-center">
              選擇門市
            </p>

            {/* Scroll to Top Button */}
            <button
              onClick={scrollToTop}
              className="w-11 h-11 flex items-center justify-center rounded-full bg-black transition-opacity hover:opacity-90"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.41 15.41L12 10.83L16.59 15.41L18 14L12 8L6 14L7.41 15.41Z" fill="white"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex gap-2.5 items-start px-4 pb-3 shrink-0 w-full">
          <div className="bg-[rgba(120,120,128,0.16)] flex flex-1 items-center px-3 py-[11px] rounded-full">
            <div className="flex flex-1 gap-2 items-center">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z" fill="#999999"/>
              </svg>
              <input
                type="text"
                placeholder="搜尋地標"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none font-poppins text-[17px] text-text-subtle placeholder-[#999999]"
              />
            </div>
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 11H7.83L12.71 6.12L11.29 4.7L4 12L11.29 19.3L12.71 17.88L7.83 13H19C19 13 19 11 19 11Z" fill="#999999"/>
            </svg>
          </div>
        </div>

        {/* Store List */}
        <div 
          id="store-list"
          className="flex-1 overflow-y-auto pb-6"
        >
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <p className="font-noto-sans text-text-subtle">載入中...</p>
            </div>
          ) : filteredStores.length === 0 ? (
            <div className="flex items-center justify-center py-20">
              <p className="font-noto-sans text-text-subtle">
                {searchQuery ? '沒有符合的店家' : '沒有可用的店家'}
              </p>
            </div>
          ) : (
            <div className="flex flex-col">
              {filteredStores.map((store, index) => (
                <div
                  key={store.id}
                  onClick={() => handleStoreClick(store.id)}
                  className="flex gap-3 items-center min-h-[48px] pl-4 pr-2 py-2 cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  {/* Content */}
                  <div className="flex-1 flex flex-col gap-1 overflow-hidden pr-2">
                    {/* Store Name */}
                    <p className="font-noto-sans font-semibold text-sm text-text-main overflow-hidden text-ellipsis whitespace-nowrap">
                      {store.name}
                    </p>
                    {/* Distance and Address */}
                    <p className="font-noto-sans text-xs overflow-hidden text-ellipsis whitespace-nowrap">
                      <span className="text-[#6200ee]">{store.distance}</span>
                      <span className="text-text-subtle"> · {store.address || '台北市內湖區'}</span>
                    </p>
                  </div>

                  {/* Chevron */}
                  <div className="shrink-0">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z" fill="#9e9e9e"/>
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* iOS Home Indicator */}
        <div className="h-[21px] flex items-center justify-center bg-white shrink-0">
          <div className="w-[139px] h-[5px] bg-gray-300 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default ChooseStoreModal;
