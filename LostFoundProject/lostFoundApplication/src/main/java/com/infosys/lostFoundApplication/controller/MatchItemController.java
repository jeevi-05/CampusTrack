package com.infosys.lostFoundApplication.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.infosys.lostFoundApplication.bean.MatchItem;
import com.infosys.lostFoundApplication.bean.MatchItemDTO;
import com.infosys.lostFoundApplication.dao.MatchItemDao;
import com.infosys.lostFoundApplication.service.MatchItemService;

@RestController
@RequestMapping("/lostfound/")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class MatchItemController {
    @Autowired
    private MatchItemDao matchItemDao;
    
    @Autowired
    private MatchItemService service;
    
    @PostMapping("/match")
	public void saveMatchItem(@RequestBody MatchItemDTO matchItemDTO) {
    	service.updateLostFoundItems(matchItemDTO);
    	MatchItem matchItem= new MatchItem(matchItemDTO);
    	matchItemDao.saveMatchItem(matchItem);
		
    }
	@GetMapping("/match")
	public List<MatchItem> getAllMatchItems(){
		return matchItemDao.getAllMatchItems();
		
	}
    
	
	
}
