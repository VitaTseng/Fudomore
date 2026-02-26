import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useMenuItems } from '../hooks/useMenuItems';
import StatusBar from '../components/StatusBar';
import MenuItemCard from '../components/MenuItemCard';
import CategoryTab from '../components/CategoryTab';
import DrinkDetailModal from '../components/DrinkDetailModal';

// Menu data now fetched from Supabase via useMenuItems hook

const StoreDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addToCart, getTotalItems } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDrink, setSelectedDrink] = useState(null);

  // Fetch menu items from Supabase
  const { menuItems, categories, loading } = useMenuItems(id);

  // Set initial category when categories load
  useEffect(() => {
    if (categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0].id);
    }
  }, [categories, selectedCategory]);

  const filteredItems = menuItems.filter(item => item.category === selectedCategory);
  const cartCount = getTotalItems();

  const handleMenuItemClick = (item) => {
    setSelectedDrink(item);
    setIsModalOpen(true);
  };

  const handleAddToCart = (order) => {
    addToCart(order);
    console.log('Added to cart:', order);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  return (
    <div className="bg-white flex flex-col relative size-full overflow-hidden">
      {/* Fixed Status Bar */}
      <div className="fixed left-0 right-0 top-0 z-40">
        <StatusBar />
      </div>

      {/* Fixed Navigation Buttons */}
      <div className="fixed left-0 top-0 w-full z-30 pointer-events-none">
        <div className="flex items-center justify-between px-2 pt-[57px] w-full pointer-events-auto">
          {/* Back Button */}
          <button 
            onClick={handleBack}
            className="bg-white overflow-clip relative rounded-[40px] shrink-0 size-11 transition-opacity hover:opacity-80 shadow-md"
          >
            <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 overflow-clip size-9 top-1/2">
              <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.41 7.41L14 6L8 12L14 18L15.41 16.59L10.83 12L15.41 7.41Z" fill="black"/>
              </svg>
            </div>
          </button>
          
          {/* Right Buttons */}
          <div className="flex gap-3 items-center justify-end relative shrink-0">
            {/* Favorite Button */}
            <button className="bg-white overflow-clip relative rounded-[40px] shrink-0 size-11 transition-opacity hover:opacity-80 shadow-md">
              <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 overflow-clip size-9 top-1/2">
                <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" fill="black"/>
                </svg>
              </div>
            </button>
            
            {/* Share Button */}
            <button className="bg-white overflow-clip relative rounded-[40px] shrink-0 size-11 transition-opacity hover:opacity-80 shadow-md">
              <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 overflow-clip size-9 top-1/2">
                <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 16.08C17.24 16.08 16.56 16.38 16.04 16.85L8.91 12.7C8.96 12.47 9 12.24 9 12C9 11.76 8.96 11.53 8.91 11.3L15.96 7.19C16.5 7.69 17.21 8 18 8C19.66 8 21 6.66 21 5C21 3.34 19.66 2 18 2C16.34 2 15 3.34 15 5C15 5.24 15.04 5.47 15.09 5.7L8.04 9.81C7.5 9.31 6.79 9 6 9C4.34 9 3 10.34 3 12C3 13.66 4.34 15 6 15C6.79 15 7.5 14.69 8.04 14.19L15.16 18.35C15.11 18.56 15.08 18.78 15.08 19C15.08 20.61 16.39 21.92 18 21.92C19.61 21.92 20.92 20.61 20.92 19C20.92 17.39 19.61 16.08 18 16.08Z" fill="black"/>
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto w-full">
        {/* Cover Image */}
        <div className="h-[210px] overflow-clip relative shrink-0 w-full">
          <img 
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800" 
            alt="Store cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute bg-gradient-to-b from-transparent via-transparent to-[#333] h-[85px] left-0 top-[125px] w-full" />
        </div>
        
        {/* Store Info Section */}
        <div className="bg-white flex flex-col gap-3 items-center pb-4 pt-7 px-4 w-full">
          {/* Store Name and Rating */}
          <div className="flex flex-col gap-0.5 items-center relative shrink-0 w-full">
            <p className="font-noto-sans font-semibold leading-normal min-w-full overflow-hidden relative shrink-0 text-xl text-text-main text-center text-ellipsis w-min whitespace-nowrap">
              不可思議茶bar 7-ELEVEn 總部門市
            </p>
            
            {/* Rating and Distance */}
            <div className="flex gap-0.5 h-7 items-center justify-center overflow-clip py-1 relative shrink-0">
              <div className="flex gap-1 items-start relative shrink-0">
                <div className="flex flex-col items-center justify-center relative shrink-0">
                  <div className="flex flex-col gap-1 items-start relative shrink-0">
                    <div className="flex flex-col font-noto-sans leading-[0] overflow-hidden relative shrink-0 text-text-main text-ellipsis">
                      <p className="text-sm">
                        <span className="font-semibold leading-[1.5]">⭐ 4.8</span>
                        <span className="font-normal leading-[1.5]">（2,000+)</span>
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-1 items-start relative shrink-0">
                  <div className="flex flex-col font-noto-sans font-normal justify-center leading-[0] overflow-hidden relative shrink-0 text-sm text-text-main text-ellipsis w-full">
                    <p className="leading-[1.5]">・4.3 公里</p>
                  </div>
                </div>
              </div>
              
              {/* Arrow */}
              <div className="overflow-clip relative shrink-0 size-9">
                <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z" fill="#424242"/>
                </svg>
              </div>
            </div>
          </div>
          
          {/* Info Cards */}
          <div className="bg-white border border-[#eeeeee] border-solid flex gap-3 items-center py-1 relative rounded-card-m shrink-0 w-full max-w-[361px]">
            {/* Wait Time */}
            <div className="flex flex-1 flex-col items-center justify-center leading-[1.5] min-h-px min-w-px p-3 relative rounded-card-m text-center">
              <p className="font-noto-sans font-semibold relative shrink-0 text-sm text-text-main">
                免等
              </p>
              <p className="font-noto-sans font-normal relative shrink-0 text-xs text-text-subtlest">
                忙碌程度
              </p>
            </div>
            
            {/* Divider */}
            <div className="flex flex-col h-8 items-start justify-center relative shrink-0 w-[0.5px]">
              <div className="flex flex-1 items-center justify-center min-h-px min-w-px relative w-full">
                <div className="flex-none rotate-90 size-full">
                  <div className="relative size-full">
                    <div className="absolute inset-0 bg-[#00000026]" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Pickup Time */}
            <div className="flex flex-1 flex-col items-center justify-center leading-[1.5] min-h-px min-w-px p-3 relative rounded-card-m text-center">
              <p className="font-noto-sans font-semibold relative shrink-0 text-sm text-text-main">
                10 分鐘
              </p>
              <p className="font-noto-sans font-normal relative shrink-0 text-xs text-text-subtlest">
                最快取餐時間
              </p>
            </div>
          </div>
        </div>
        
        {/* Menu Section */}
        <div className="bg-white flex flex-col items-start w-full pt-2 pb-24">
          <div className="flex items-start pt-2 px-4 w-full">
            {loading ? (
              <div className="w-full text-center py-8">
                <p className="font-noto-sans text-text-subtle">載入菜單中...</p>
              </div>
            ) : (
              <div className="flex gap-6 items-start w-full">
                {/* Sidebar Categories */}
                <div className="flex flex-col gap-1 items-start shrink-0">
                  {categories.length === 0 ? (
                    <p className="font-noto-sans text-text-subtle text-sm py-2">沒有分類</p>
                  ) : (
                    categories.map(category => (
                      <CategoryTab
                        key={category.id}
                        label={category.label}
                        selected={selectedCategory === category.id}
                        onClick={() => setSelectedCategory(category.id)}
                      />
                    ))
                  )}
                </div>
                
                {/* Menu Items */}
                <div className="flex flex-1 flex-col gap-3 items-start w-full">
                  {filteredItems.length === 0 ? (
                    <div className="w-full text-center py-8">
                      <p className="font-noto-sans text-text-subtle">此分類沒有商品</p>
                    </div>
                  ) : (
                    filteredItems.map(item => (
                      <MenuItemCard
                        key={item.id}
                        image={item.image}
                        name={item.name}
                        price={item.price}
                        onAdd={() => handleMenuItemClick(item)}
                      />
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Fixed Store Logo Overlay */}
      <div className="fixed bg-avatar-container border-[0.5px] border-[#bdbdbd] border-solid left-[160px] overflow-clip rounded-[40px] size-[72px] top-[162px] z-20">
        <div 
          className="absolute inset-[-0.5px]" 
          style={{ 
            backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\"0 0 160 160\" xmlns=\"http://www.w3.org/2000/svg\" preserveAspectRatio=\"none\"><rect x=\"0\" y=\"0\" height=\"100%\" width=\"100%\" fill=\"url(%23grad)\" opacity=\"0.20000000298023224\"/><defs><radialGradient id=\"grad\" gradientUnits=\"userSpaceOnUse\" cx=\"0\" cy=\"0\" r=\"10\" gradientTransform=\"matrix(4.8986e-16 8 -8 4.8986e-16 80 80)\"><stop stop-color=\"rgba(0,0,0,1)\" offset=\"0\"/><stop stop-color=\"rgba(0,0,0,0)\" offset=\"0.75\"/></radialGradient></defs></svg>'), url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 160 160\" preserveAspectRatio=\"none\"><g transform=\"matrix(-1.6552 7.5746 -8.0079 -1.7498 80 80)\"><foreignObject x=\"-220.75\" y=\"-220.75\" width=\"441.5\" height=\"441.5\"><div xmlns=\"http://www.w3.org/1999/xhtml\" style=\"background-image: conic-gradient(from 90deg, rgb(255, 125, 198) -1.2425%, rgb(207, 141, 194) 3.3181%, rgb(159, 157, 190) 7.8788%, rgb(111, 172, 186) 12.439%, rgb(63, 188, 182) 17%, rgb(56, 153, 187) 27.267%, rgb(49, 117, 192) 37.533%, rgb(42, 82, 198) 47.8%, rgb(35, 47, 203) 58.066%, rgb(62, 57, 202) 63.153%, rgb(90, 67, 202) 68.239%, rgb(145, 86, 200) 78.412%, rgb(200, 106, 199) 88.585%, rgb(255, 125, 198) 98.758%, rgb(207, 141, 194) 103.32%, rgb(159, 157, 190) 107.88%, rgb(111, 172, 186) 112.44%, rgb(63, 188, 182) 117%); opacity:1; height: 100%; width: 100%;\"></div></foreignObject></g></svg>')" 
          }} 
        />
        <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-noto-sans font-semibold justify-center leading-[0] left-1/2 not-italic size-14 text-[40px] text-text-white text-center top-1/2">
          <p className="leading-normal">縣</p>
        </div>
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[72px] top-1/2">
          <img 
            alt="Store logo" 
            className="absolute inset-0 max-w-none object-cover pointer-events-none size-full rounded-[40px]" 
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=150" 
          />
        </div>
      </div>
      
      {/* Fixed Cart Button */}
      <div className="fixed bottom-[35px] left-1/2 -translate-x-1/2 z-20">
        <button 
          className="bg-black flex gap-2 h-[50px] items-center justify-center px-5 py-3.5 rounded-[1000px] w-[186px] transition-opacity hover:opacity-90 shadow-lg"
          onClick={handleCartClick}
        >
          <div className="overflow-clip relative shrink-0 size-9">
            <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 18C5.9 18 5.01 18.9 5.01 20C5.01 21.1 5.9 22 7 22C8.1 22 9 21.1 9 20C9 18.9 8.1 18 7 18ZM1 2V4H3L6.6 11.59L5.25 14.04C5.09 14.32 5 14.65 5 15C5 16.1 5.9 17 7 17H19V15H7.42C7.28 15 7.17 14.89 7.17 14.75L7.2 14.63L8.1 13H15.55C16.3 13 16.96 12.59 17.3 11.97L20.88 5.48C20.96 5.34 21 5.17 21 5C21 4.45 20.55 4 20 4H5.21L4.27 2H1ZM17 18C15.9 18 15.01 18.9 15.01 20C15.01 21.1 15.9 22 17 22C18.1 22 19 21.1 19 20C19 18.9 18.1 18 17 18Z" fill="white"/>
            </svg>
          </div>
          <p className="font-noto-sans font-semibold leading-normal relative shrink-0 text-base text-white text-center">
            購物車({cartCount})
          </p>
        </button>
      </div>

      {/* iOS Home Indicator */}
      <div className="fixed bottom-0 h-[21px] left-0 overflow-clip w-full z-10">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute flex h-[5px] items-center justify-center left-1/2 top-1/2 w-[139px]">
          <div className="-scale-y-100 flex-none rotate-180">
            <div className="bg-white h-[5px] rounded-[100px] w-[139px]" />
          </div>
        </div>
      </div>

      {/* Drink Detail Modal */}
      <DrinkDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        drink={selectedDrink}
        storeName="不可思議茶bar 7-ELEVEn 總部門市"
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default StoreDetail;
