package com.infosys.lostFoundApplication.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.infosys.lostFoundApplication.bean.FoundItem;
import com.infosys.lostFoundApplication.bean.LostItem;
import com.infosys.lostFoundApplication.bean.MatchItem;
import com.infosys.lostFoundApplication.bean.MatchItemDTO;
import com.infosys.lostFoundApplication.dao.FoundItemDao;
import com.infosys.lostFoundApplication.dao.LostItemDao;

@Service
public class MatchItemService {
	@Autowired
	private LostItemDao lostItemDao;
	
	@Autowired
	private FoundItemDao foundItemDao;

	public void  updateLostFoundItems(MatchItemDTO matchItemDTO) {
		String lostItemId=matchItemDTO.getLostItemId();
		String foundItemId=matchItemDTO.getFoundItemId();
		LostItem lostItem=lostItemDao.getLostItemById(lostItemId);
		FoundItem foundItem=foundItemDao.getFoundItemById(foundItemId);
		lostItem.setStatus(true);
		foundItem.setStatus(true);
		lostItemDao.saveLostItem(lostItem);
		foundItemDao.saveFoundItem(foundItem);
		
	}
}
