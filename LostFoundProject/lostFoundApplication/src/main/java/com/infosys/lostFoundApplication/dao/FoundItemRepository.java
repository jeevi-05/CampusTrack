package com.infosys.lostFoundApplication.dao;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.infosys.lostFoundApplication.bean.FoundItem;

public interface FoundItemRepository extends JpaRepository<FoundItem, String> {

	    @Query("SELECT max(foundItemId) FROM FoundItem")
	    public String getLastId();

	    @Query("SELECT a FROM FoundItem a WHERE a.username = ?1")
	    public List<FoundItem> getFoundItemsByUsername(String username);
	    
	    @Query ("SELECT f FROM FoundItem f WHERE f.status=false and ( " +
	            "LOWER(f.foundItemName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
	    		"LOWER(f.color) LIKE LOWER(CONCAT('%', :keyword, '%')) OR "+
	            "LOWER(f.brand) LIKE LOWER(CONCAT('%', :keyword, '%')) OR "+
	    		"LOWER(f.location) LIKE LOWER(CONCAT('%', :keyword, '%')) OR "+
	            "LOWER(f.category) LIKE LOWER(CONCAT('%', :keyword, '%')))")
	    List<FoundItem> searchByKeyword(String keyword);
	    
	    @Query(value ="SELECT * FROM found_item WHERE status=false and (" +
	                  "SOUNDEX(found_item_name)=SOUNDEX(:keyword) OR " +
	    		      "SOUNDEX(color)=SOUNDEX(:keyword) OR "+
	                  "SOUNDEX(brand)=SOUNDEX(:keyword) OR "+
	    		      "SOUNDEX(location)=SOUNDEX(:keyword) OR "+
	                  "SOUNDEX(category)=SOUNDEX(:keyword))", nativeQuery=true)
	    List<FoundItem> fuzzySearchBySoundex(String keyword);
	    
}
