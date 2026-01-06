package com.infosys.lostFoundApplication.dao;

import java.util.List;
import com.infosys.lostFoundApplication.bean.FoundItem;

public interface FoundItemDao {

    public void saveFoundItem(FoundItem foundItem);

    public List<FoundItem> getAllFoundItems();

    public FoundItem getFoundItemById(String foundItemId);

    public void deleteFoundItemById(String foundItemId);

    public String getLastId();

    public List<FoundItem> getFoundItemsByUsername(String username);
}
