package com.infosys.lostFoundApplication.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.infosys.lostFoundApplication.bean.FoundItem;
import com.infosys.lostFoundApplication.bean.FoundItemDTO;
import com.infosys.lostFoundApplication.bean.LostItem;
import com.infosys.lostFoundApplication.dao.FoundItemDao;
import com.infosys.lostFoundApplication.dao.LostItemDao;
import com.infosys.lostFoundApplication.service.FoundItemService;
import com.infosys.lostFoundApplication.service.LostfoundUserService;

@RestController
@RequestMapping("/lostfound/")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class FoundItemController {

	@Autowired
	private LostItemDao lostItemDao;
	
    @Autowired
    private FoundItemDao foundItemDao;

    @Autowired
    private FoundItemService foundItemService;

    @Autowired
    private LostfoundUserService userService;

    
    @PostMapping("/found")
    public void saveFoundItem(@RequestBody FoundItem foundItem) {
        foundItemDao.saveFoundItem(foundItem);
    }

    @GetMapping("/found")
    public List<FoundItem> getAllFoundItems() {
        return foundItemDao.getAllFoundItems();
    }

    @GetMapping("/found/{id}")
    public FoundItem getFoundItemById(@PathVariable String id) {
        return foundItemDao.getFoundItemById(id);
    }

    @DeleteMapping("/found/{id}")
    public void deleteFoundItemById(@PathVariable String id) {
        foundItemDao.deleteFoundItemById(id);
    }

    @PutMapping("/found")
    public void updateFoundItem(@RequestBody FoundItem foundItem) {
        foundItemDao.saveFoundItem(foundItem);
    }

    @GetMapping("/found-id")
    public String generateId() {
        return foundItemService.generateFoundItemId();
    }

    @GetMapping("/found-user")
    public List<FoundItem> getFoundItemsByUsername() {
        String userId = userService.getUserId();
        return foundItemDao.getFoundItemsByUsername(userId);
    }
    @GetMapping("/found-id/{id}")
    public List<FoundItemDTO> getFoundItemsByLostItem(@PathVariable String id){
    	LostItem lostItem=lostItemDao.getLostItemById(id);
    	return foundItemService.collectFoundItems(lostItem);
    	
    }
}
