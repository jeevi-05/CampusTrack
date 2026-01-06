	package com.infosys.lostFoundApplication.dao;
	
	import java.util.List;
	
	import org.springframework.beans.factory.annotation.Autowired;
	import org.springframework.stereotype.Repository;
	import org.springframework.stereotype.Service;
	
	import com.infosys.lostFoundApplication.bean.LostItem;
	@Service
	@Repository
	public class LostItemDaoImpl implements LostItemDao {
	    @Autowired
	    private LostItemRepository repository;
	    
		@Override
		public void saveLostItem(LostItem lostItem) {
			repository.save(lostItem);
		}
	
		@Override
		public List<LostItem> getAllLostItems() {
		    return repository.findAll();
		}
	
		@Override
		public LostItem getLostItemById(String lostItemId) {
			return repository.findById(lostItemId).get();
			
		}
	
		@Override
		public void deleteLostItemById(String lostItemId) {
			 repository.deleteById(lostItemId);
	
		}
	    
		@Override
		public String getLastId() {
			return repository.getLastId();
		}
		
	
		@Override
		public List<LostItem> getLostItemsByUsername(String username){
			return repository.getLostItemsByUsername(username);
		}
	
	}
