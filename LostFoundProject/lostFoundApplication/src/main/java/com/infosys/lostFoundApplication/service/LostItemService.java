package com.infosys.lostFoundApplication.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.infosys.lostFoundApplication.dao.LostItemDao;

@Service
public class LostItemService {
	
	@Autowired
	private LostItemDao lostItemDao;
	public String generateLostItemId() {
		  String newId="";
			String id=lostItemDao.getLastId();
			if(id==null) {
				newId="L100001";
			}
			else {
			int num=Integer.parseInt(id.substring(1))+1;
			newId="L"+num;
			}
			return newId;
	  }

}
